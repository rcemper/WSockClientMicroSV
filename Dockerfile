ARG IMAGE=intersystemsdc/iris-community:2020.4.0.547.0-zpm
FROM $IMAGE

USER root   
        
WORKDIR /opt/irisbuild

RUN chown ${ISC_PACKAGE_MGRUSER}:${ISC_PACKAGE_IRISGROUP} /opt/irisbuild

USER ${ISC_PACKAGE_MGRUSER}

COPY src src

COPY iris.script iris.script

RUN iris start IRIS \
	&& iris session IRIS < iris.script \
    && iris stop IRIS quietly

