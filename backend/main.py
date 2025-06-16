import cv2
import numpy as np
import threading
from flask import Flask, render_template, jsonify

IP_CAMERA_URL = "http://192.168.7.13:8080/video" 
PARKING_SLOT_COLOR = (0, 255, 0)    
OCCUPIED_COLOR = (0, 0, 255)      
THRESHOLD_AREA = 500

PARKING_SLOTS = [
    {"x": 20, "y": 20, "width": 350, "height": 200},
    {"x": 400, "y": 20, "width": 350, "height": 200},
    {"x": 780, "y": 20, "width": 350, "height": 200},
    {"x": 20, "y": 250, "width": 350, "height": 200},
    {"x": 400, "y": 250, "width": 350, "height": 200},
    {"x": 780, "y": 250, "width": 350, "height": 200},
    {"x": 20, "y": 480, "width": 350, "height": 200},
    {"x": 400, "y": 480, "width": 350, "height": 200},
    {"x": 780, "y": 480, "width": 350, "height": 200}
]

slot_status = ["Empty"] 
prev_available = None  

def load_parking_slots():
    """Return the predefined parking slot coordinates."""
    return PARKING_SLOTS

def detect_parking_slots(frame, slots):
    """
    Detect empty and occupied slots in the parking area.
    Returns the processed frame and a list of slot statuses.
    """
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    edges = cv2.Canny(blurred, 50, 150)

    detected_slots = []
    for i, slot in enumerate(slots):
        x, y, w, h = slot["x"], slot["y"], slot["width"], slot["height"]
        slot_area = edges[y:y+h, x:x+w]
        non_zero_pixels = np.count_nonzero(slot_area)

        if non_zero_pixels > 4000:  
            slot_status = "Occupied"
            color = OCCUPIED_COLOR 
        else:
            slot_status = "Empty"
            color = PARKING_SLOT_COLOR 

        detected_slots.append(slot_status)

        cv2.rectangle(frame, (x, y), (x + w, y + h), color, 4)
        cv2.putText(frame, f"Slot {i+1}: {slot_status}", (x + 20, y + 80), 
                    cv2.FONT_HERSHEY_SIMPLEX, 1, color, 2)

    return frame, detected_slots

def update_slot_status_and_display():
    """
    Continuously read the camera feed, detect parking slots, display the feed with overlays,
    update global slot statuses, and print to terminal when availability changes.
    """
    global slot_status, prev_available
    parking_slots = load_parking_slots()

    cap = cv2.VideoCapture(IP_CAMERA_URL)
    if not cap.isOpened():
        print(f"Error: Unable to access IP camera at {IP_CAMERA_URL}. Check IP, port, and stream status.")
        print("Tips: Ensure the camera app is running on your phone and both devices are on the same Wi-Fi.")
        return

    print("Camera feed opened successfully.")
    while True:
        ret, frame = cap.read()
        if not ret:
            print("Failed to retrieve frame from camera. Check connection or restart the camera app.")
            break

        processed_frame, detected_slots = detect_parking_slots(frame, parking_slots)

        slot_status = detected_slots

        available = slot_status.count("Empty")
        if prev_available is None or available != prev_available:
            print(f"Camera Feed - Available slots: {available}/9 | Status: {slot_status}")
            prev_available = available

        cv2.imshow("Smart Parking System", processed_frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()
    print("Camera feed closed.")

threading.Thread(target=update_slot_status_and_display, daemon=True).start()

app = Flask(__name__)

@app.route('/')
def dashboard():
    """Serve the dashboard HTML page."""
    return render_template('dashboard.html')

@app.route('/status')
def status():
    """Return the current slot statuses as JSON for the dashboard."""
    return jsonify(slot_status)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')