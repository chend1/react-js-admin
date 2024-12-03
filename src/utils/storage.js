/**
 * 获取key
 */
export const getStorage = (key) => {
  const value = localStorage.getItem(key);
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

/**
 * 保存key
 * @param {*} key
 * @param {*} value
 */
export const setStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * 删除key
 */
export const removeStorage = (key) => {
  localStorage.removeItem(key);
};
