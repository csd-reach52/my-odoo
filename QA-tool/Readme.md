# Kiwi

Set up

```
git clone https://github.com/kiwitcms/Kiwi.git
cd Kiwi
docker compose up -d
docker exec -it kiwi_web /Kiwi/manage.py initial_setup

# stop kiwi
docker compose stop 

# start kiwi
docker compose start

# view logs kiwi
docker logs -f kiwi_web

# delete implemented system (not images)
docker compose down
```