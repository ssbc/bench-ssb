node 00-generate.js
echo "running 01"
node 01-validate.js > 01-out.txt
echo "running 02"
node 02-json.js > 02-out.txt
echo "running 03"
node 03-flume.js > 03-out.txt
echo "running 04"
node 04-minimal.js > 04-out.txt
echo "running 05"
node 05-ssb-legacy.js > 05-out.txt
echo "running 06"
node 06-ssb-read.js > 06-out.txt
echo "running 07"
node 07-clock-dump.js > 07-out.txt
echo "running 08"
node 08-sbot-read.js > 08-out.txt
echo "running 09"
node 09-sbot-replicate.js > 09-out.txt
echo "running 10"
node 10-sbot-replicate-post.js > 10-out.txt
echo "running 11"
node 11-sbot-replicate-ebt.js > 11-out.txt
