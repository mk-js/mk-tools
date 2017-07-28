import childProcess from 'child_process'
import which from 'which'

var npms = ['npm']

export function findNpm() {
	for (var i = 0; i < npms.length; i++) {
		try {
			which.sync(npms[i])
			console.log('use npm: ' + npms[i])
			return npms[i]
		} catch (e) {

		}
	}
	throw new Error('please install npm')
}


export async function runCmd(cmd, args, cwd) {
    return new Promise((reslove, reject)=>{
        args = args || []
        var runner = childProcess.spawn(cmd, args, {
            stdio: "inherit",
            cwd:cwd
        })
        runner.on('close', function(code) {
            reslove(code)
        })
    })
}