# sh build.sh

sudo service docker start

sam local start-api \
--port 8000 \
--host 0.0.0.0 \
--warm-containers EAGER \
--template ./deploy/cdk.out/Default.template.json