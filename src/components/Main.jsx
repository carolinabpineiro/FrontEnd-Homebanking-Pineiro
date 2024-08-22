import CustomButton from "./CustomButton"

function Main() {
  return (
    <main>
      <p>Soy el main</p>

      <h2 className="text-xl font-semibold mb-2">Account Information</h2>
      
      <div className="bg-yellow-600 shadow-md rounded-lg p-4 max-w-sm mx-auto">
      
      <div className="mb-2">
        <span className="font-medium">Account Number:</span>
        <p>1212121212121212121212</p>
      </div>
      <div className="mb-2">
        <span className="font-medium">Amount:</span>
        <p>jkjjljllkk;</p>
      </div>
      <div>
        <span className="font-medium">Creation Date:</span>
        <p>19.12.1990</p>
      </div>
    </div>
<CustomButton text="Custom Button"/>
<CustomButton text="Request"/>
    
    </main>
  )
}

export default Main
