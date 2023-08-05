import log from "loglevel";

log.setDefaultLevel(log.levels.ERROR);

if (process.env.NODE_ENV === "development") {
  log.setLevel(log.levels.DEBUG);
}

const { getLogger: _getLogger, levels } = log;

const getLogger = (name: string) => _getLogger(name);

export { getLogger, levels };
