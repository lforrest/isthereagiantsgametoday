PY?=python
PIP?=pip
BASEDIR=$(CURDIR)
DATADIR?=$(BASEDIR)/data

help:
	@echo 'Makefile for www.isthereagiantsgametoday.com          '
	@echo '                                                      '
	@echo 'Usage:                                                '
	@echo '  make build  install requirements and generate data  '
	@echo '  make clean  remove generated files                  '
	@echo '  make serve [PORT=8000]  serve site at localhost:8000'
	@echo '                                                      '

build:
	[ -f requirements.txt ] && \
	$(PIP) install -r requirements.txt && \
	$(PY) $(BASEDIR)/get_schedule.py

clean:
	[ ! -f $(DATADIR)/*.json ] || rm -rf $(DATADIR)/*.json

serve:
ifdef PORT
	cd $(BASEDIR) && $(PY) -m SimpleHTTPServer $(PORT)
else
	cd $(BASEDIR) && $(PY) -m SimpleHTTPServer
endif

.PHONY: help build clean serve
