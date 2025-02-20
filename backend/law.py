import os
import argparse
from jamaibase import JamAI, protocol as p
from typing import Dict, Optional

class Law:
    def __init__(self, project_id: str, pat: str):
        self.client = JamAI(
            project_id=project_id,
            token=pat
        )
    
    def validate_image(self, image_path: str) -> bool:
        if not os.path.exists(image_path):
            raise FileNotFoundError(f"Image not found: {image_path}")
            
        valid_extensions = ['.jpg', '.jpeg', '.png']
        file_ext = os.path.splitext(image_path)[1].lower()
        if file_ext not in valid_extensions:
            raise ValueError(f"Unsupported file format. Use: {valid_extensions}")
            
        return True

    def process_receipt(self, image_path: str) -> Optional[Dict[str, str]]:
        try:
            self.validate_image(image_path)
            
            print(f"Processing receipt: {image_path}")
            print("Uploading image...")
            file_response = self.client.file.upload_file(image_path)
            print(f"Upload successful!")
            
            print("Extracting information...")
            response = self.client.add_table_rows(
                table_type=p.TableType.action,
                request=p.RowAddRequest(
                    table_id="legal",
                    data=[{"pic": file_response.uri}],
                    stream=False,
                ),
            )
            
            results = {
                "law": response.rows[0].columns["law"].text,
                "rec": response.rows[0].columns["rec"].text
            }
            print(results)
            return results
            
        except Exception as e:
            print(f"Error: {str(e)}")
            return None

def main():
    # Set up argument parser
    parser = argparse.ArgumentParser(description='Process receipt images using JamAIBase')
    parser.add_argument('--project-id', required=True, help='Your JamAIBase project ID')
    parser.add_argument('--pat', required=True, help='Your Personal Access Token')
    parser.add_argument('--input', required=True, help='Path to image file or folder')
    
    args = parser.parse_args()

    # Initialize processor
    processor = Law(args.project_id, args.pat)

    # Single file processing
    result = processor.process_receipt(args.input)
    if result:
        print("\nResults:")
        print("-" * 50)
        print(f"Shop Name: {result['shop_name']}")
        print(f"Total: {result['total']}")
        print("-" * 50)

if __name__ == "__main__":
    main()