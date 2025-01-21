export function formatTime(dateString: string) {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    // Convert hours from 24-hour format to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
  
    // Pad single digit minutes with leading zero
    const paddedMinutes = minutes < 10 ? '0' + minutes : minutes;
  
    // Formatted time string
    const formattedTime = `${hours}:${paddedMinutes} ${ampm}`;
    
    return formattedTime;
  }
  
export function formatDate(dateString: string) {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  };

  // Formatting the date using Intl.DateTimeFormat
  const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);

  // Extracting day, month and year from formattedDate
  const [day, month, year] = formattedDate.split(' ');

  // Returning formatted date as 'day month, year'
  return `${day} ${month}, ${year}`;
}

export function getCurrentDateTime() {
    const now = new Date();
    
    // Format the date and time
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(now.getUTCDate()).padStart(2, '0');
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(now.getUTCMilliseconds()).padStart(3, '0');
    
    // Combine all parts into ISO 8601 format
    const isoDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
    
    return isoDateTime;
  }
  
export type ProcessedMessage = { sender: string; data: any } | { sender: string; date: string };


export function processPreviousMessageArray(messages: any[]) {


    var lastCreatedAt: string | null = null;
    const processedPreviousMessageArray: ProcessedMessage[] = [];

    if ( messages.length != 0)

      messages.map((message) => {
        
        // First chat message, create date
        if (lastCreatedAt == null) {

          console.log("INITAL SET DATE:!!!! ", message.attributes.createdAt)
          processedPreviousMessageArray.push({
            "sender": "date",
            "date" : message.attributes.createdAt
          })
          lastCreatedAt = message.attributes.createdAt;
        } else if ( areDatesSame(lastCreatedAt, message.attributes.createdAt)) {
          // Do nothing messages of samed day
          console.log("Doing  NOTING!!!!")
          // Do nothing messages of samed day
        } else {
          console.log("DATE IS CHANGED!!!!")
          console.log("PREV DATE:!!!! ", lastCreatedAt)
          console.log("CHANGED DATE!!!!", message.attributes.createdAt)
          console.log("DATE IS CHANGED!!!!")

          processedPreviousMessageArray.push({
            "sender": "date",
            "date" : message.attributes.createdAt
          })
          lastCreatedAt = message.attributes.createdAt;


          console.log("ACTUAL CHANGED DATE THAT  SHOULD  BE THE  NEXT VLAUE!!!!", lastCreatedAt)

        }


        // Pushing for User
        processedPreviousMessageArray.push({
          "sender": "user",
          "data" : message
        });

        // Pushing for server
        processedPreviousMessageArray.push({
          "sender": "server",
          "data" : message
        });
      })


    return processedPreviousMessageArray;
}


function areDatesSame(dateString1: string, dateString2: string): boolean {
  // Extract the date part (everything before 'T')
  const datePart1 = dateString1.split('T')[0];
  const datePart2 = dateString2.split('T')[0];

  // Compare the date parts
  return datePart1 === datePart2;
}

