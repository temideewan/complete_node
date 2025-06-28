class DatabaseValidationError extends Error {
  constructor(message){
    super(message)
    this.isDbError = true;
  }
}
