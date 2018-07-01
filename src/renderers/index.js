import deep from './deep';
import plain from './plain';

const json = ast => JSON.stringify(ast, null, '  ');

const renders = { deep, plain, json };

export default (format, ast) => {
  const render = renders[format];

  if (!render) {
    throw new Error(`Unknow format: ${format}`);
  }

  return render(ast);
};
