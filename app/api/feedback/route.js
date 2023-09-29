import fs from "fs";
import path from "path";

export async function GET(req, { params }) {
  const filePath = path.join(process.cwd(), "data", "feedback.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  return Response.json(
    { feedback: data },
    {
      status: 200,
    }
  );
}
export async function POST(req, { params }) {
  const body = await req.json();
  const { email, btext } = body;

  const newFeedback = {
    id: new Date().toISOString(),
    email: email,
    text: btext,
  };

  //store received data to json file
  const filePath = path.join(process.cwd(), "data", "feedback.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  data.push(newFeedback);
  fs.writeFileSync(filePath, JSON.stringify(data));

  return Response.json(
    { feedback: newFeedback },
    {
      status: 200,
    }
  );
}
