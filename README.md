# bench-ssb

The benchmarks run on 100k messages and consists of:

1. Validate: test the performance of validating messages using ssb-validate
2. JSON: test the performance of JSON stringify
3. Flume: test appending messages to flumedb
4. Minimal: append messages to secure scuttlebutt
5. SSB Legacy: test the performance of createWriteStream
6. SSB read: test the performance of db.get
7. Clock dump: read a vector clock using getAtSequence
8. Sbot read: read a vector clock using createHistoryStream
9. Sbot replicate: replicate messages between two sbots using sbot read
10. Sbot replicate post: replicate using post instead of createHistoryStream
11. Sbot replicate ebt: like post but using ebt
12. Flume reduce: test the performance of reduce, often used in indexes
13. Private: test the performance of encrypting and decrypting messages

The results can be visualized using
[benchmark-ci-visualizer](https://github.com/ssbc/benchmark-ci-visualizer)
repo.

## Testing on android

- install termux
- install [sshd](https://glow.li/technology/2015/11/06/run-an-ssh-server-on-your-android-with-termux/) inside termux for easier remote controlling
- inside termux:
  - apt install git nodejs-lts
  - git clone https://github.com/ssbc/bench-ssb.git
  - npm i
  - run-all-android.sh

Don't worry that sodium-native won't compile. Wasm is not [so bad](https://github.com/ssbc/bench-ssb/issues/5).

## License

MIT
