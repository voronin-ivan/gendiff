import deep from './deep';
import plain from './plain';

const renders = { deep, plain };

export default (format, ast) => {
  const render = renders[format];

  if (!render) {
    throw new Error(`Unknow format: ${format}`);
  }

  return render(ast);
};
