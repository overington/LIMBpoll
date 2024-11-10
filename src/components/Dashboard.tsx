import Card, {CardTitle, CardSubtitle} from "@/components/Card";
import { questions } from "@/data/questions";

export function DashboardCard(props) {
  return (
    <Card title="Questions" description="Select Which Question to show">
      <span>Chosen ID: </span>
    </Card>
  );
}
export default function Dashboard() {
  // show each question in a card, set the current question to be highlighted
  //

  return (
    <div className="flex flex-col">
      <Card>
        <CardTitle>Questions</CardTitle>
        <CardSubtitle>Select Which Question to show (<span>Chosen ID: </span>)</CardSubtitle>
      </Card>
      <form action="">
        {Object.keys(questions).map((questionID) => {
          const el_id = `admin-select-${questionID}`;
          return (
            <Card key={questionID} className="mb-4">
              <input type="radio" name="current-question" id={el_id} />
              <label htmlFor={el_id}>
                <CardTitle>{questions[questionID].title}</CardTitle>
                <CardSubtitle>{questions[questionID].question}</CardSubtitle>
                <p>Options:</p>
                <ul>
                  {questions[questionID].options.map((option, index) => (
                    <li key={index}>{option}</li>
                  ))}
                </ul>
              </label>
            </Card>
          );
        })}
      </form>
    </div>
  );
}
