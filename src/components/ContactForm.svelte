<script lang="ts">
  let subject: string;
  let message: string;
  let email: string;
  let error: string;
  let successful: boolean = false;

  const sendMessage = async (event: unknown) => {
    error = null
    try {
      const res = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        body: JSON.stringify({
          subject,
          message,
          email
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (res.ok) {
        successful = true
        subject = ""
        message = ""
      } else {
        error = "The message has not been sent. Please, retry later."
      }
    } catch (error) {
      error = "Something went wrong. Please, retry later."
    }
  }
</script>

<form class="grid gap-4" on:submit|preventDefault={sendMessage}>
  <div class="grid gap-1">
    <label for="subject">Subject:</label>
    <input required type="text" name="subject" id="subject" class="p-4 rounded-md shadow-sm" bind:value={subject}/>
  </div>
  <div class="grid gap-1">
    <label for="message">Message:</label>
    <textarea required name="message" id="message" class="min-h-textfield p-4 rounded-md shadow-sm" bind:value={message}/>
  </div>
  <div class="grid gap-1">
    <label for="email">Email: (optional)</label>
    <input type="email" name="email" id="email" class="p-4 rounded-md shadow-sm" bind:value={email}/>
    <p class="text-xs italic">If you want me to contact you back, please leave me your email.</p>
  </div>
  <button type="submit" class="place-self-start rounded-md p-4 w-40 bg-indigo-700 text-white shadow-sm">  
    Send
  </button>
  {#if successful}
    <p>Message sent successfully</p>
  {/if}
  {#if error}
    <p>{error}</p>
  {/if}
</form>
