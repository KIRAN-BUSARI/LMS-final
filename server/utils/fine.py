import os
os.environ['GRADIENT_WORKSPACE_ID']='f40d30a4-3a90-47e9-994a-55a9b4313b27_workspace'
os.environ['GRADIENT_ACCESS_TOKEN']='DjJubZ3n5GsUGVyrkFmoVz2T1eNDzM8h'

from gradientai import Gradient


def main():
    gradient = Gradient()

    base_model = gradient.get_base_model(base_model_slug="nous-hermes2")

    new_model_adapter = base_model.create_model_adapter(
        name="Vaishmodel"
    )
    print(f"Created model adapter with id {new_model_adapter.id}")


    sample_query = "### Instruction: What is web development? \n\n ### Response:"
    print(f"Asking: {sample_query}")
    ## Before Finetuning
    completion = new_model_adapter.complete(query=sample_query, max_generated_token_count=100).generated_output
    print(f"Generated(before fine tuning): {completion}")

    samples=[
        {"inputs":"### Instruction: What does web development mean? \n\n### Response: refers to the tasks associated with creating, building, and maintaining websites and web applications that run online on a browser. It may, however, also include web design, web programming, and database management."},
        {"inputs":"### Instruction: What is full stack development? \n\n### Response: Web development is the process of creating and maintaining websites, involving tasks like designing the look, building the structure, and managing the content"},
        {"inputs":"### Instruction: Define Web development  ? \n\n### Response: Web development is the trending technology used to build websites ,A Full stack web development includes many technologies under it"},
        {"inputs":"### Instruction: Can you explain me what does full stack web development mean? \n\n### Response: Full stack web development is the practice of working on both the front-end (the part of a website users see and interact with) and the back-end (the server, database, and application logic that make the website work) of a web application. Full stack developers have the skills to build and manage the entire web application from start to finish"}
    ]

    ## Lets define parameters for finetuning
    num_epochs=1
    count=0
    while count<num_epochs:
      print(f"Fine tuning the model with iteration {count + 1}")
      new_model_adapter.fine_tune(samples=samples)
      count=count+1

    #after fine tuning
    completion = new_model_adapter.complete(query=sample_query, max_generated_token_count=100).generated_output
    print(f"Generated(after fine tuning): {completion}")
    new_model_adapter.delete()
    gradient.close()

if __name__ == "__main__":
    main()