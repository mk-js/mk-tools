import vfs from 'vinyl-fs'
import fs from 'fs'
import through from 'through2'
import path from 'path'
import which from 'which'


const { join, basename } = path

export default function app(cmd, options) {

    createApp(
        options.init ? (cmd || path.basename(process.cwd())) : cmd,
        options.init ? process.cwd() : join(process.cwd(), cmd)
    )

    function createApp(appName, dest) {
        var cwd = join(__dirname, '../../assets/app/template')
        vfs.src(['**/*', '!node_modules/**/*'], { cwd: cwd, cwdbase: true, dot: true })

            .pipe(through.obj(function (file, enc, cb) {
                if (!file.stat.isFile()) {
                    return cb()
                }
                this.push(file)
                cb()
            }))

            .pipe(vfs.dest(dest))

            .on('end', function () {
                var replaceNameFiles = [
                    path.join(dest, 'index.js'),
                    path.join(dest, 'style.less'),
                ]
                
                replaceNameFiles.forEach(o => {
                    fs.writeFileSync(o, fs.readFileSync(o, 'utf-8').replace(/\$\{appName\}/g, appName.split('/').pop()))
                })

                console.log('OK!')

            })
            .resume();
    }
}
