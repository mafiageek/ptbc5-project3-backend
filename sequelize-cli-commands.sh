#The following commands assumed that you have set up the table with
NOTE DO NOT RUN THIS, PROBABLY RAN ALREADY. START FROM LINE 6
npx sequelize db:create
#all model files have been generated and they are present in /src/db/models
#drops all table
npx sequelize db:migrate:undo --name 20230130142935-create-product-image.js
npx sequelize db:migrate:undo --name 20230128101342-create-product.js
npx sequelize db:migrate:undo --name 20230201083733-create-category.js
#creates all table in db from seed file
npx sequelize db:migrate
#seeds all data from seed files under /src/db/seeders
npx sequelize db:seed --seed 20230129083948-seed-products.js
npx sequelize db:seed --seed 20230201093245-seed-product-images.js
npx sequelize db:seed --seed 20230201090927-seed-categories.js

npx sequelize db:migrate --name 20230201083733-create-category.js

npx sequelize db:migrate --name 20230206141228-create-user.js
npx sequelize db:migrate --name 20230206141924-create-user-address.js
npx sequelize db:migrate --name 20230206145637-create-order.js

#Phase 2
npx sequelize db:migrate:undo --name 20230206145637-create-order.js
npx sequelize db:migrate:undo --name 20230206141924-create-user-address.js
npx sequelize db:migrate:undo --name 20230206141228-create-user.js

npx sequelize db:migrate --name 20230206141228-create-user.js
npx sequelize db:migrate --name 20230206141924-create-user-address.js
npx sequelize db:migrate --name 20230206145637-create-order.js
npx sequelize db:migrate --name 20230210113936-create-order-item.js

npx sequelize db:seed --seed 20230208150621-seed-users.js
npx sequelize db:seed --seed 20230208151658-seed-user-addresses.js
npx sequelize db:seed --seed 20230210120628-seed-orders.js
npx sequelize db:seed --seed 20230210121418-seed-order-items.js