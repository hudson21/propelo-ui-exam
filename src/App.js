import { useState, useEffect, useCallback } from 'react';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import DUMMY_DATA from './data/dummy-data.json';

const App = () => {
  const [records, setRecords] = useState(null);

  const [showNumberOfTickets, setShowNumberOfTickets] = useState(true);
  const [showHighestPriority, setShowHighestPriority] = useState(false);
  const [showMediumPriority, setShowMediumPriority] = useState(false);
  const [showHighPriority, setShowHighPriority] = useState(false);

  const [showInReview, setShowInReview] = useState(false);
  const [showInStaging, setShowInStaging] = useState(false);
  const [showInProgress, setShowInProgress] = useState(false);
  const [showReadyForProd, setShowReadyForProd] = useState(false);
  const [showWontDo, setShowWontDo] = useState(false);
  const [showInternalReview, setShowInternalReview] = useState(false);
  const [showForDevelopment, setShowForDevelopment] = useState(false);
  const [showTodo, setShowTodo] = useState(false);
  const [showBacklog, setShowBacklog] = useState(false);
  const [showDone, setShowDone] = useState(false);

  const [showBug, setShowBugs] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [showImprovement, setShowImprovement] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const [showSubTask, setShowSubTask] = useState(false);
  const [showEpic, setShowEpic] = useState(false);

  const addNewValues = (object) => {
    const newObject = { ...object };
    newObject.number_of_tickets += 1;
    newObject[newObject['issue_type'].toLowerCase()] += 1;

    if (newObject['issue_type'] === 'sub-task') {
      newObject.subtask += 1;
    }

    if (newObject.priority === 'HIGHEST') {
      newObject.highest_tickets += 1;
    }
    if (newObject.priority === 'MEDIUM') {
      newObject.medium_tickets += 1;
    }
    if (newObject.priority === 'HIGH') {
      newObject.high_tickets += 1;
    }

    if (newObject.status.toLowerCase().replace(/\s/g, '') === 'inreview') {
      newObject['in_review_status'] += 1;
    }

    if (newObject.status.toLowerCase().replace(/\s/g, '') === 'instaging') {
      newObject['in_staging_status'] += 1;
    }

    if (newObject.status.toLowerCase().replace(/\s/g, '') === 'inprogress') {
      newObject['in_progress_status'] += 1;
    }

    if (newObject.status.toLowerCase().replace(/\s/g, '') === 'readyforprod') {
      newObject['ready_for_prod_status'] += 1;
    }

    if (newObject.status.toLowerCase().replace(/\s/g, '') === 'wontdo') {
      newObject['wont_do_status'] += 1;
    }

    if (
      newObject.status.toLowerCase().replace(/\s/g, '') === 'internalreview'
    ) {
      newObject['internal_review_status'] += 1;
    }

    if (
      newObject.status.toLowerCase().replace(/\s/g, '') ===
      'selectedfordevelopment'
    ) {
      newObject['selected_for_development'] += 1;
    }

    if (newObject.status.toLowerCase().replace(/\s/g, '') === 'todo') {
      newObject.todo_status += 1;
    }

    if (newObject.status === 'BACKLOG') {
      newObject.backlog_status += 1;
    }

    if (newObject.status === 'DONE') {
      newObject.done_status += 1;
    }

    return newObject;
  };

  const convertObjectToArray = (records) => {
    const transformedArray = [];

    for (let key in records) {
      transformedArray.push(records[key]);
    }
    setRecords(transformedArray);
  };

  const formatRecords = useCallback(() => {
    const transformed_records = {};
    DUMMY_DATA.records
      .map((record) => {
        return {
          ...record,
          number_of_tickets: 0,

          in_review_status: 0,
          in_staging_status: 0,
          in_progress_status: 0,
          ready_for_prod_status: 0,
          wont_do_status: 0,
          internal_review_status: 0,
          backlog_status: 0,
          highest_tickets: 0,
          medium_tickets: 0,
          high_tickets: 0,
          todo_status: 0,
          done_status: 0,
          selected_for_development: 0,

          bug: 0,
          task: 0,
          improvement: 0,
          story: 0,
          subtask: 0,
          epic: 0,
        };
      })
      .forEach((record) => {
        if (!transformed_records[record.assignee]) {
          transformed_records[record.assignee] = addNewValues(record);
        } else {
          transformed_records[record.assignee] = addNewValues(
            transformed_records[record.assignee]
          );
        }
      });

    convertObjectToArray(transformed_records);
  }, []);

  useEffect(() => {
    formatRecords();
  }, [formatRecords]);

  return (
    <div className="flex-column">
      <div className="flex-center" style={{ marginTop: '20px' }}>
        <div>
          <input
            type="checkbox"
            id="number_of_tickets"
            name="number_of_tickets"
            checked={showNumberOfTickets}
            onChange={(e) => setShowNumberOfTickets(e.target.checked)}
          />
          <label htmlFor="number_of_tickets">Number of Tickets</label>
        </div>
      </div>
      <div className="flex-column">
        <h2>Issue Type</h2>

        <div className="flex-center">
          <div>
            <input
              type="checkbox"
              id="show_bugs"
              name="show_bugs"
              checked={showBug}
              onChange={(e) => setShowBugs(e.target.checked)}
            />
            <label htmlFor="show_bugs">Bugs</label>
          </div>

          <div>
            <input
              type="checkbox"
              id="show_task"
              name="show_task"
              checked={showTask}
              onChange={(e) => setShowTask(e.target.checked)}
            />
            <label htmlFor="show_task">Tasks</label>
          </div>

          <div>
            <input
              type="checkbox"
              id="improvement"
              name="improvement"
              checked={showImprovement}
              onChange={(e) => setShowImprovement(e.target.checked)}
            />
            <label htmlFor="improvement">Improvement</label>
          </div>

          <div>
            <input
              type="checkbox"
              id="story"
              name="story"
              checked={showStory}
              onChange={(e) => setShowStory(e.target.checked)}
            />
            <label htmlFor="story">Stories</label>
          </div>

          <div>
            <input
              type="checkbox"
              id="subtask"
              name="subtask"
              checked={showSubTask}
              onChange={(e) => setShowSubTask(e.target.checked)}
            />
            <label htmlFor="subtask">Sub Tasks</label>
          </div>

          <div>
            <input
              type="checkbox"
              id="epic"
              name="epic"
              checked={showEpic}
              onChange={(e) => setShowEpic(e.target.checked)}
            />
            <label htmlFor="epic">Epics</label>
          </div>
        </div>
      </div>
      <div className="flex-column">
        <h2>Priority</h2>
        <div className="flex-center">
          <div>
            <input
              type="checkbox"
              id="highest_priority"
              name="highest_priority"
              checked={showHighestPriority}
              onChange={(e) => setShowHighestPriority(e.target.checked)}
            />
            <label htmlFor="highest_priority">Highest</label>
          </div>

          <div>
            <input
              type="checkbox"
              id="medium_priority"
              name="medium_priority"
              checked={showMediumPriority}
              onChange={(e) => setShowMediumPriority(e.target.checked)}
            />
            <label htmlFor="medium_priority">Medium</label>
          </div>

          <div>
            <input
              type="checkbox"
              id="high_priority"
              name="high_priority"
              checked={showHighPriority}
              onChange={(e) => setShowHighPriority(e.target.checked)}
            />
            <label htmlFor="high_priority">High</label>
          </div>
        </div>
      </div>

      <div className="flex-column">
        <h2>Status</h2>
        <div className="flex-center">
          <div>
            <input
              type="checkbox"
              id="in_review"
              name="in_review"
              checked={showInReview}
              onChange={(e) => setShowInReview(e.target.checked)}
            />
            <label htmlFor="in_review">In Review</label>
          </div>

          <div>
            <input
              type="checkbox"
              id="in_staging"
              name="in_staging"
              checked={showInStaging}
              onChange={(e) => setShowInStaging(e.target.checked)}
            />
            <label htmlFor="in_staging">In Staging</label>
          </div>

          <div>
            <input
              type="checkbox"
              id="in_progress"
              name="in_progress"
              checked={showInProgress}
              onChange={(e) => setShowInProgress(e.target.checked)}
            />
            <label htmlFor="in_progress">In Progress</label>
          </div>

          <div>
            <input
              type="checkbox"
              id="ready_for_prod"
              name="ready_for_prod"
              checked={showReadyForProd}
              onChange={(e) => setShowReadyForProd(e.target.checked)}
            />
            <label htmlFor="ready_for_prod">Ready For Prod</label>
          </div>

          <div>
            <input
              type="checkbox"
              id="wont_do"
              name="wont_do"
              checked={showWontDo}
              onChange={(e) => setShowWontDo(e.target.checked)}
            />
            <label htmlFor="wont_do">Won't Do</label>
          </div>

          <div>
            <input
              type="checkbox"
              id="internal_review"
              name="internal_review"
              checked={showInternalReview}
              onChange={(e) => setShowInternalReview(e.target.checked)}
            />
            <label htmlFor="internal_review">Internal Review</label>
          </div>

          <div>
            <input
              type="checkbox"
              id="selected_for_development"
              name="selected_for_development"
              checked={showForDevelopment}
              onChange={(e) => setShowForDevelopment(e.target.checked)}
            />
            <label htmlFor="selected_for_development">
              Selected For Development
            </label>
          </div>

          <div>
            <input
              type="checkbox"
              id="todo"
              name="todo"
              checked={showTodo}
              onChange={(e) => setShowTodo(e.target.checked)}
            />
            <label htmlFor="todo">To Do</label>
          </div>

          <div>
            <input
              type="checkbox"
              id="backlog"
              name="backlog"
              checked={showBacklog}
              onChange={(e) => setShowBacklog(e.target.checked)}
            />
            <label htmlFor="backlog">Backlog</label>
          </div>

          <div>
            <input
              type="checkbox"
              id="done"
              name="done"
              checked={showDone}
              onChange={(e) => setShowDone(e.target.checked)}
            />
            <label htmlFor="done">Done</label>
          </div>
        </div>
      </div>

      <BarChart
        barGap={25}
        barSize={10}
        barCategoryGap="30%"
        width={900}
        height={900}
        data={records}
        margin={{
          top: 50,
          bottom: 50,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis tick={{ stroke: '#ccc' }} dataKey="assignee" />
        <YAxis
          label={{ value: 'Tickets', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip />
        <Legend />

        {showNumberOfTickets && (
          <Bar dataKey="number_of_tickets" fill="#1abc9c" />
        )}

        {showHighestPriority && (
          <Bar dataKey="highest_tickets" fill="#f1c40f" />
        )}

        {showMediumPriority && <Bar dataKey="medium_tickets" fill="#9b59b6" />}

        {showHighPriority && <Bar dataKey="high_tickets" fill="#006266" />}

        {showInReview && <Bar dataKey="in_review_status" fill="#7f8c8d" />}

        {showInStaging && <Bar dataKey="in_staging_status" fill="#d35400" />}

        {showInProgress && (
          <Bar
            dataKey="in_progress_status"
            fill="#f39c12"
            label="In Progress"
          />
        )}

        {showReadyForProd && (
          <Bar dataKey="ready_for_prod_status" fill="#c0392b" />
        )}

        {showWontDo && <Bar dataKey="wont_do_status" fill="#273c75" />}

        {showInternalReview && (
          <Bar dataKey="internal_review_status" fill="#487eb0" />
        )}

        {showForDevelopment && (
          <Bar dataKey="selected_for_development" fill="#00a8ff" />
        )}

        {showTodo && <Bar dataKey="todo" fill="#8c7ae6" />}

        {showBacklog && <Bar dataKey="backlog_status" fill="#353b48" />}

        {showDone && <Bar dataKey="done_status" fill="#44bd32" />}

        {showBug && <Bar dataKey="bug" fill="#ef5777" />}

        {showTask && <Bar dataKey="task" fill="#575fcf" />}

        {showImprovement && <Bar dataKey="improvement" fill="#4bcffa" />}

        {showStory && <Bar dataKey="story" fill="#4bcffa" />}

        {showSubTask && <Bar dataKey="subtask" fill="#3c40c6" />}

        {showEpic && <Bar dataKey="epic" fill="#ffa801" />}
      </BarChart>
    </div>
  );
};

export default App;
