# Project Initiation:
init:
	@make d-rm
	@make d-compose
	@make dependencies
	@make start

start:
	@make d-up
	@make d-start
	@docker-compose exec -w /var www sh -c "service apache2 start"
	@make dist
	@make w

stop:
	@docker-compose stop


# Connect:
ssh:
	@docker-compose exec -w /var/www/web www /bin/bash

ssh-db:
	@docker-compose exec -w /var/lib/mysql db /bin/bash

logs:
	@docker-compose exec -w / www sh -c "tail -f /var/log/apache2/error.log"

# Grunt Management:
clean:
	rm -rf www
	@make dist

dist:
	cd public; grunt dist; cd ..

w:
	cd public; grunt w; cd ..

ssh-db:
	docker-compose exec -w / db /bin/bash

d-sps:
	@make d-start
	@make d-ps

# Docker Management:
d-compose:
	@docker-compose build --no-cache
d-start:
	docker-compose start
d-stop:
	docker-compose stop
d-up:
	docker-compose up -d --remove-orphans
d-down:
	docker-compose down
d-ps:
	docker-compose ps
d-rm:
	@make d-stop
	docker-compose rm -f

# Dependencies:
dependencies:
	cd public; npm update; cd ..
	cd public; npm audit fix; cd ..
	cd public; npm install; cd ..
	@docker-compose exec -w /var/www/web www sh -c "composer install"