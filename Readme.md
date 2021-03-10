# Backend typescript task

To run this app use docker and docker-compose. Execute `docker-compose up` in folder's root. App will be avaliable by `localhost:3000`

Swagger is avaliable by `localhost:3000/api-docs`

Details:
1. All objects stored in memry. 
2. Also there is no strict check for float type ( remember 0.1+0.2=0.30000000000000004 ) for real project I will use [Decimal](https://github.com/MikeMcl/decimal.js/)
3. There is no check for unique email/username
4. All validation performed with DTO and [class-validator](https://www.npmjs.com/package/class-validator)
5. To test greacefull shutdown request for `/test` path and in terminal execute `docker container stop %container_hash%` where `%container_hash%` is id of builded container, and can be found by executing `docker ps`
6. Logs are avaliable under `build/logs` and contain error, info and verbose log files. Loggger implemented with winston and winston-daily-rotate-file.