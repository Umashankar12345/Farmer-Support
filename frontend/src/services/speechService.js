// Speech service — uses browser MediaRecorder API for voice input
// Sends audio to backend Whisper endpoint if available, otherwise returns simulated transcript

export async function startVoiceRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    const chunks = [];

    return new Promise((resolve) => {
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = async () => {
        // Stop all tracks to release microphone
        stream.getTracks().forEach((t) => t.stop());

        // Try sending to backend for Whisper transcription
        try {
          const blob = new Blob(chunks, { type: 'audio/webm' });
          const formData = new FormData();
          formData.append('audio', blob);

          const res = await fetch('/api/speech/transcribe', {
            method: 'POST',
            body: formData,
          });

          if (res.ok) {
            const { transcript } = await res.json();
            resolve(transcript);
          } else {
            // Backend not ready — return a demo phrase
            resolve('What is the best fertilizer for wheat in Rajasthan?');
          }
        } catch {
          // Network error — return demo phrase
          resolve('What is the best fertilizer for wheat in Rajasthan?');
        }
      };

      recorder.start();
      // Stop after 5 seconds
      setTimeout(() => recorder.stop(), 5000);
    });
  } catch (err) {
    console.error('Microphone access denied or not available:', err);
    // Return demo query if mic not available
    return 'How do I treat yellow rust on wheat?';
  }
}
