run=$1
rm -rf data/"$run"
mkdir -p data/"$run"
{
  echo 'name, total, sample, average, seconds'
  for bench in {0,1}*.js; do
    node $bench > data/"$run"/"$bench".csv
    tail -n 1 data/"$run"/"$bench".csv
  done
} | tee data/"$run"/summary.csv

