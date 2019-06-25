mkdir tmp
node 00-generate.js
echo "running 01"
node android-wrapper.js 01-validate.js > 01-out.txt
echo "running 02"
node android-wrapper.js 02-json.js > 02-out.txt
echo "running 03"
node android-wrapper.js 03-flume.js > 03-out.txt
echo "running 04"
node android-wrapper.js 04-minimal.js > 04-out.txt
echo "running 05"
node android-wrapper.js 05-ssb-legacy.js > 05-out.txt
echo "running 06"
node android-wrapper.js 06-ssb-read.js > 06-out.txt
echo "running 07"
node android-wrapper.js 07-clock-dump.js > 07-out.txt
echo "running 08"
node android-wrapper.js 08-sbot-read.js > 08-out.txt
echo "running 09"
node android-wrapper.js 09-sbot-replicate.js > 09-out.txt
echo "running 10"
node android-wrapper.js 10-sbot-replicate-post.js > 10-out.txt
echo "running 11"
node android-wrapper.js 11-sbot-replicate-ebt.js > 11-out.txt
echo "running 12"
node android-wrapper.js 12-flume-reduce.js > 12-out.txt
echo "running 13"
node android-wrapper.js 13-test-private.js > 13-out.txt
rm -rf tmp/bench-ssb-legacy_ssb tmp/bench-ssb-legacy_ssb2
