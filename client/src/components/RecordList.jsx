import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

function displayLevel(level) {
  if(!level) return '';
  const normalized = level.toString().toLowerCase().trim();

  const levelMap = {
    'intern': 'Intern',
    'junior': 'Junior',
    'senior': 'Senior'
  };

  return levelMap[normalized] || level;

}

const Record = ({record, onDelete}) => (
  <tr className="border-b transition-colors hover:bg-muted/50">
    {/* Cell 1: Name */}
    <td className="p-4 align-middle">
      {record.name}
    </td>
    
    {/* Cell 2: Position */}
    <td className="p-4 align-middle">
      {record.position}
    </td>
    
    {/* Cell 3: Level (Using our helper function!) */}
    <td className="p-4 align-middle">
      {displayLevel(record.level)}
    </td>
    {/* Cell 4: Actions (Edit and Delete buttons) */}
    <td className="p-4 align-middle">
      <div className="flex gap-2">
        {/* The Link sends the user to the edit page with this record's unique ID */}
        <Link
          className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-3 text-sm font-medium transition-colors hover:bg-slate-100"
          to={`/edit/${record._id}`}
        >
          Edit
        </Link>
        
        {/* The Delete button triggers the onDelete function and passes the record's ID */}
        <button
          className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-3 text-sm font-medium transition-colors hover:bg-slate-100 hover:text-red-600"
          type="button"
          onClick={() => onDelete(record._id)}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- FETCHING DATA ---
  // useEffect tells React: "Run this code as soon as the component appears on screen"
  useEffect(() => {
    async function getRecords() {
      try {
        // 1. Ask the backend for the data
        const response = await fetch("/record/");
        
        // 2. Check if the server gave us a bad response (like a 404 error)
        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }
        
        // 3. Convert the response to JSON
        const data = await response.json();
        
        // 4. Save the data to our 'records' state. 
        // (The ternary operator just handles different ways your backend might format the JSON)
        setRecords(Array.isArray(data) ? data : data.data ?? []);
        
      } catch (err) {
        console.error(err.message);
        setError(err.message); // If it fails, show the error on screen
      } finally {
        setIsLoading(false); // Stop the loading screen whether it succeeded or failed!
      }
    }
    
    getRecords();
  }, []); // The empty array [] means "only run this ONCE when the page loads"

  // --- DUMMY DELETE FUNCTION ---
  // We need this so our Record component doesn't crash when it looks for 'onDelete'
  // --- REAL DELETE FUNCTION ---
  async function deleteRecord(id) {
    try {
      // 1. Tell the backend to delete the record from the database
      const response = await fetch(`/record/${id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error(`Failed to delete record: ${response.statusText}`);
      }

      // 2. Update the UI! 
      // We take the previous list of records, and filter OUT the one that matches the deleted ID.
      // This makes the row vanish instantly without reloading the page.
      setRecords((prevRecords) => prevRecords.filter((record) => record._id !== id));
      
    } catch (err) {
      console.error(err.message);
      alert("Failed to delete the record. Please try again.");
    }
  }

  if (isLoading) {
    return <div className="p-4 text-muted-foreground">Loading records...</div>;
  }
  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <>
    <h3 className="p-4 text-lg font-semibold">Employee Records</h3>
      <div className="overflow-hidden rounded-lg border">
        <div className="relative w-full overflow-auto">
          
          <table className="w-full caption-bottom text-sm">
            
            {/* Table Headers */}
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Name
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Position
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Level
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Action
                </th>
              </tr>
            </thead>
            {/* Table Body (Now dynamic!) */}
            <tbody className="[&_tr:last-child]:border-0">
              {/* If we have 0 records, show a message */}
              {records.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-muted-foreground">
                    No records found.
                  </td>
                </tr>
              ) : (
                /* If we DO have records, map over them and create a row for each */
                records.map((record) => (
                  <Record
                    key={record._id}       // React needs a unique key for every item in a list
                    record={record}        // Pass the data to the child component
                    onDelete={deleteRecord} // Pass our delete function to the child component
                  />
                ))
              )}
            </tbody>
            
          </table>

        </div>
      </div>
    </>
  )

}