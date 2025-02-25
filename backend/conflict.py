import argparse
from jamaibase import JamAI, protocol as p
from typing import Dict, Optional

class Conflict:
    def __init__(self, project_id: str, pat: str):
        self.client = JamAI(
            project_id=project_id,
            token=pat
        )

    def process_conflict(self, input: str) -> Optional[Dict[str, str]]:
        try: 
            print(f"Processing: {input}")
            
            print("Extracting information...")
            response = self.client.add_table_rows(
                table_type=p.TableType.action,
                request=p.RowAddRequest(
                    table_id="conflict",
                    data=[{"input": input}],
                    stream=False,
                ),
            )
            
            results = {
                "output1": response.rows[0].columns["conflict summary"].text,
                "output2": response.rows[0].columns["solution"].text,
                "output3": response.rows[0].columns["conflict report"].text,
            }
            print(results)
            return results
            
        except Exception as e:
            print(f"Error: {str(e)}")
            return None

def main():
    # Set up argument parser
    parser = argparse.ArgumentParser(description='Process using JamAIBase')
    parser.add_argument('--project-id', required=True, help='Your JamAIBase project ID')
    parser.add_argument('--pat', required=True, help='Your Personal Access Token')
    parser.add_argument('--input', required=True, help='Input text for analysis')

    args = parser.parse_args()

    # Initialize processor
    processor = Conflict(args.project_id, args.pat)

    # Process the input text
    result = processor.process_conflict(args.input)
    if result:
        print("\nResults:")
        print("-" * 50)
        print(f"Output: {result['output1']}")
        print(f"Output: {result['output2']}")
        print(f"Output: {result['output3']}")
        print("-" * 50)

if __name__ == "__main__":
    main()
