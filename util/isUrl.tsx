function isUrl(str: any) {
  try {
    new URL(str);
    return true;
  } catch (_) {
    return false;
  }
}

export default isUrl;
