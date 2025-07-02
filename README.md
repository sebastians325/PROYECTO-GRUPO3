# PROYECTO-GRUPO3
1er paso:
*     en pgAdmin crear una base de datos llamada IS2 con clave 12345678
*     en pgAdmin crear una base de datos llamada IS2_test con clave 12345678

2do paso:
*     npm install express-validator
*     (ponerlo en la carpeta raiz del proyecto)

3er paso:
*     (en carpeta cliente)
*     npm install
*     npm start

4to paso
*     (en carpeta servidor)
*     npx sequelize-cli db:migrate

5to paso
*     (en carpeta servidor)
*     npm install
*     npm start

6to paso (para correr test)
*     (en carpeta servidor)
*     NODE_ENV=test npm test

7mo paso (si es que sale error al correr test)
*     psql -U postgres
*     CREATE DATABASE "IS2_test";


Nota: instalar las dependencias -> npm install bcrypt cors express jsonwebtoken nodemon pg pg-hstore pg-protocol postgres react-router-dom sequelize sequelize-cli web-vitals axios dotenv express-validator nodemon react-icons react-scripts

considerar que el correo se debe registrar e ingresar en minuscula en todos lo casos
