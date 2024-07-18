const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

app.post('/api/register', (req, res) => {
  const { username, password, name, address, phoneNumber } = req.body;
  
  // เพิ่ม logic ของการลงทะเบียนที่นี่

  // สำหรับตัวอย่าง สมมติว่าการลงทะเบียนสำเร็จ
  res.status(200).json({ success: true });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
