import pandas as pd
import json

# Read Excel file
df = pd.read_excel("Jaunie jaunie varianti.xlsx")

# Convert to JSON
json_data = df.to_json(orient="records", force_ascii=False, indent=4)

# Save JSON to file
# with open("atb_varianti_1.json", "w", encoding="utf-8") as f:
#     f.write(json_data)

json_data = json.loads(json_data)

modified_json = {}
for entry in json_data:
    # print("pirms:",entry)
    komplekts = entry["Komplekts"]
    bilde = entry["Bilde"]
    entry.pop("Komplekts")
    entry.pop("Bilde")
    entry.pop("Cits (2)")
    # print("pec:",entry)
    if komplekts not in modified_json:
        modified_json[komplekts] = []
    modified_json[komplekts].append({
        "Bilde": bilde,
        "Atbildes": entry
    })
with open("atb_varianti_1.json", "w", encoding="utf-8") as f:
    json.dump(modified_json, f, ensure_ascii=False, indent=4)
print("Conversion complete! JSON saved as output.json")
