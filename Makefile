dcup:
	docker compose up -d && ${MAKE} dclogs
dcstop:
	docker compose stop
dclogs:
	docker compose logs api -f
dcbash:
	docker compose exec -it api bash
dcrm:
	docker compose rm -f -s api
dcrs:
	$(MAKE) dcrm && $(MAKE) dcup && $(MAKE) dclogs
dprune:
	docker system prune -a -f
migration:
	docker exec api bash -c 'yarn prisma migrate deploy'
