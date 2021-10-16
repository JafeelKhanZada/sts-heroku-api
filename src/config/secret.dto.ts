export class SecretDTO {
  private readonly secretKey = null;
  constructor() {
    this.secretKey = 'MIRZASTSFAWAZ';
  }
  getSecretKey(): string {
    return this.secretKey;
  }
  getEnovriment(): string {
    return '.env';
  }
}
