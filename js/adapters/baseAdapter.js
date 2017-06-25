export default class BaseAdapter {
  preprocess(data) {
    return data;
  }

  toServer(data) {
    return JSON.stringify(data);
  }
}
