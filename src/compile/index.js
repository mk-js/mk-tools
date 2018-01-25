import compileWebsite from './compileWebsite'
import compileServer from './compileServer'
import genDoc from './genDoc'
import path from 'path'
import apidoc from 'apidoc-core'


export default function compile(who, rootPath) {
	if( who == 'website')
		compileWebsite(rootPath)

	if( who == 'server')
		compileServer(rootPath)

	genDoc()
}
