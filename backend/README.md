conda activate myflaskenv
python app.py

pip freeze > requirements.txt
python receipt_processor.py --project-id "proj_4d4ac300b826e16d940f59e4" --pat "jamai_pat_7f05cdcdd67fa7b93625180f4a841861ba49507ea9ec06ff" --input "download.jpeg"  