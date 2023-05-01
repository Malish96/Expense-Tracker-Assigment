import axios, { AxiosInstance } from 'axios';

class BaseService {
  public connection: AxiosInstance;
  private SERVER_URL = 'http://localhost:5000';

  public constructor() {
    this.connection = this.initConnection();
  }

  private initConnection = () => {
    return axios.create({
      baseURL: this.SERVER_URL,
    });
  };
}

export default BaseService;
