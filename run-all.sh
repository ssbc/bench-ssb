run=$1

if [ x$run = x ]; then
  run=$(node -p 'new Date()')
fi

mkdir -p data/working
rm -rf data/working/*

echo benchmark run: $run

{
  echo 'name, seconds, total, total/seconds'
  for bench in {0,1}*.js; do
    node $bench > data/working/"$bench".csv
    tail -n 1 data/working/"$bench".csv
  done
} | tee data/working/summary.csv

svg-graph name,seconds < data/working/summary.csv > data/working/chart.svg

mv data/working data/"$run"
rm data/latest

ln -s "$run" data/latest

