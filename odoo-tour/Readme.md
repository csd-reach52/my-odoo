Build and Run

```
docker compose up -d --build
```

Run a tour
```
docker compose exec web odoo -i login_test -d odoo --test-tags login_tour --stop-after-init
```

Run a tour with watch mode in temporary machine
```
docker compose run --rm web odoo -i login_test -d odoo --test-tags login_tour --stop-after-init --screenshots=/mnt/extra-addons/debug_screenshots
```

View DB
```
docker compose exec db psql -U odoo odoo
```