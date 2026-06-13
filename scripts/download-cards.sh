#!/usr/bin/env bash
# Download the 78 Rider-Waite-Smith (1909, public domain) card images from
# Wikimedia Commons into public/cards with normalized slug filenames.
set -u

OUT="$(cd "$(dirname "$0")/.." && pwd)/public/cards"
mkdir -p "$OUT"
UA="Tarot4You/1.0 (chau.vovan@pioneerfinance.co.nz) curl"
BASE="https://commons.wikimedia.org/wiki/Special:FilePath"

fail=0
dl () {
  local src="$1" dest="$2"
  # URL-encode spaces and the en-dash (U+2013) used in some filenames
  local enc="${src// /%20}"
  enc="${enc//–/%E2%80%93}"
  local out="$OUT/$dest"
  if [ -f "$out" ] && [ "$(head -c2 "$out" 2>/dev/null | xxd -p)" = "ffd8" ]; then
    echo "skip  $dest (exists)"; return
  fi
  curl -sL -A "$UA" -o "$out" "$BASE/$enc"
  # Validate it is really a JPEG (Wikimedia returns an HTML error page otherwise)
  if [ "$(head -c2 "$out" 2>/dev/null | xxd -p)" != "ffd8" ]; then
    echo "FAIL  $dest  <- $src (not a JPEG)"; fail=$((fail+1))
  else
    echo "ok    $dest ($(stat -c%s "$out" 2>/dev/null || echo 0) bytes)"
  fi
}

# Major Arcana: "slug.jpeg|Source Name"
majors=(
"00-the-fool.jpeg|RWS1909 - 00 Fool.jpeg"
"01-the-magician.jpeg|RWS1909 - 01 Magician.jpeg"
"02-the-high-priestess.jpeg|RWS1909 - 02 High Priestess.jpeg"
"03-the-empress.jpeg|RWS1909 - 03 Empress.jpeg"
"04-the-emperor.jpeg|RWS1909 - 04 Emperor.jpeg"
"05-the-hierophant.jpeg|RWS1909 - 05 Hierophant.jpeg"
"06-the-lovers.jpeg|RWS1909 - 06 Lovers.jpeg"
"07-the-chariot.jpeg|RWS1909 - 07 Chariot.jpeg"
"08-strength.jpeg|RWS1909 - 08 Strength.jpeg"
"09-the-hermit.jpeg|RWS1909 - 09 Hermit.jpeg"
"10-wheel-of-fortune.jpeg|RWS1909 - 10 Wheel of Fortune.jpeg"
"11-justice.jpeg|RWS1909 - 11 Justice.jpeg"
"12-the-hanged-man.jpeg|RWS1909 - 12 Hanged Man.jpeg"
"13-death.jpeg|RWS1909 - 13 Death.jpeg"
"14-temperance.jpeg|RWS1909 - 14 Temperance.jpeg"
"15-the-devil.jpeg|RWS1909 - 15 Devil.jpeg"
"16-the-tower.jpeg|RWS1909 - 16 Tower.jpeg"
"17-the-star.jpeg|RWS1909 - 17 Star.jpeg"
"18-the-moon.jpeg|RWS1909 - 18 Moon.jpeg"
"19-the-sun.jpeg|RWS1909 - 19 Sun.jpeg"
"20-judgement.jpeg|RWS1909 - 20 Judgement.jpeg"
"21-the-world.jpeg|RWS1909 - 21 World.jpeg"
)

for entry in "${majors[@]}"; do
  dl "${entry#*|}" "${entry%%|*}"
done

# Minor Arcana
for suit in Cups Pentacles Swords Wands; do
  slug="$(echo "$suit" | tr '[:upper:]' '[:lower:]')"
  for n in 01 02 03 04 05 06 07 08 09 10 11 12 13 14; do
    dl "RWS1909 - $suit $n.jpeg" "$slug-$n.jpeg"
  done
done

# Card back (roses & lilies) — note the en-dash in the source filename
dl "Waite–Smith Tarot Roses and Lilies cropped.jpg" "card-back.jpg"

echo "----"
echo "Done. Failures: $fail"
