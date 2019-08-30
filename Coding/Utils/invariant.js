const FLAG = '_';
export default (key, action) => {
  if (key[0] === FLAG) throw new Error(`Invalid attempt to ${action} private "${key}" property`);s
}