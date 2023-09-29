import Elysia from "elysia";
import Models from "./models"; // Import your Sequelize models
import plugin from "./routes/v1";

const { Batches, Classrooms, Divisions, Slots, Subjects, Teachers } = Models;

export async function timetableGenerator(
  subjectId: string,
  slotsPerDay: number,
  durationPerSlot: number
) {
  try {
    // Implement your timetable generation logic here
    // This is a simplified example, you'll need to replace this with your actual algorithm

    const timetable = []; // Array to store timetable slots

    for (let i = 1; i <= slotsPerDay; i++) {
      const slot = await Slots.create();

      const teacher = await Teachers.findOne({ where: { id: 1 } }); // Replace with actual teacher selection logic
      const classroom = await Classrooms.findOne({ where: { id: 1 } }); // Replace with actual classroom selection logic
      const subject = await Subjects.findOne({ where: { id: subjectId } }); // Replace with actual subject selection logic

      if (!teacher || !classroom || !subject)
        throw new Error(
          "Could not find requested teacher, classroom or subject"
        );

      slot.teacherid = teacher.id;
      slot.classroomid = classroom.id;
      slot.subjectid = subject.id;

      timetable.push(slot);
    }

    return timetable;
  } catch (error) {
    throw new Error("Error generating timetable: " + error);
  }
}

const app = new Elysia();

app.use(plugin);

app.get("/", () => {
  return {
    message: "Hello World!",
  };
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
