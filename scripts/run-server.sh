PROJECT_DIRECTORY=/home/ubuntu/snail/
ENV=$PROJECT_DIRECTORY.env

if [ -f $ENV ]; then
    echo "File .env found!"
	export $(cat $ENV)
fi
forever stopall
cd $PROJECT_DIRECTORY &&
forever start ./server.js
