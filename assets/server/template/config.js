/**
 * server配置
 * 
 */

const config = ({ services }) => {
    Object.assign(server.services, services)
    configServices(server)
    return server
}

const server = {
    host: "0.0.0.0",
    port: 8000,
    apiRootUrl: "/v1",
    interceptors: [],
    services: {
        // referrenced service
        //utils,
    },
    configs: {
        // serviceName: {}
    },
}

function configServices(server) {
    var { services, configs } = server;
    Object.keys(services).filter(k => !!services[k].config).forEach(k => {
        let curCfg = Object.assign({ server, services }, configs["*"], configs[k]);
        if (services.utils && services.utils.api.env) curCfg = services.utils.api.env(curCfg);
        services[k].config(curCfg);
    })
}

module.exports = config
