"use client";

import { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Avatar,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Paper,
  Divider,
} from "@mui/material";
import { Save, Person, Notifications, Security, Palette, Language } from "@mui/icons-material";

// Typage pour TabPanel
interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && <Box sx={{ mt: 2 }}>{children}</Box>}
    </div>
  );
}

export default function SettingsContent() {
  const [tabIndex, setTabIndex] = useState(0);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
  });
  const [theme, setTheme] = useState("system");
  const [language, setLanguage] = useState("ar");
  const [timezone, setTimezone] = useState("asia/gaza");
  const [currency, setCurrency] = useState("ils");

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => setTabIndex(newValue);

  return (
    <Box sx={{ width: "100%", direction: "rtl" }}>
      <Tabs value={tabIndex} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
        <Tab icon={<Person />} label="الملف الشخصي" />
        <Tab icon={<Notifications />} label="الإشعارات" />
        <Tab icon={<Security />} label="الأمان" />
        <Tab icon={<Palette />} label="المظهر" />
        <Tab icon={<Language />} label="النظام" />
      </Tabs>

      {/* Profile Tab */}
      <TabPanel value={tabIndex} index={0}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6">معلومات الملف الشخصي</Typography>
          <Typography variant="body2" color="text.secondary">قم بتحديث معلوماتك الشخصية هنا</Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 2, gap: 2 }}>
            <Avatar sx={{ width: 80, height: 80 }}>أح</Avatar>
            <Box>
              <Button variant="outlined">تغيير الصورة</Button>
              <Typography variant="caption" display="block">JPG, PNG أو GIF (الحد الأقصى 2MB)</Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <TextField label="الاسم الأول" defaultValue="أحمد" fullWidth />
            <TextField label="اسم العائلة" defaultValue="محمد" fullWidth />
          </Box>
          <TextField label="البريد الإلكتروني" type="email" fullWidth sx={{ mt: 2 }} />
          <TextField label="رقم الهاتف" defaultValue="+970 59 123 4567" fullWidth sx={{ mt: 2 }} />
          <TextField label="نبذة شخصية" placeholder="اكتب نبذة مختصرة عنك..." fullWidth multiline rows={4} sx={{ mt: 2 }} />
          <Button variant="contained" startIcon={<Save />} sx={{ mt: 2 }}>حفظ التغييرات</Button>
        </Paper>
      </TabPanel>

      {/* Notifications Tab */}
      <TabPanel value={tabIndex} index={1}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">إعدادات الإشعارات</Typography>
          <Typography variant="body2" color="text.secondary">اختر كيف تريد أن تتلقى الإشعارات</Typography>
          <FormControlLabel
            control={
              <Switch
                checked={notifications.email}
                onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
              />
            }
            label="إشعارات البريد الإلكتروني"
            sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
          />
          <FormControlLabel
            control={
              <Switch
                checked={notifications.push}
                onChange={(e) => setNotifications({ ...notifications, push: e.target.checked })}
              />
            }
            label="الإشعارات الفورية"
            sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}
          />
          <FormControlLabel
            control={
              <Switch
                checked={notifications.sms}
                onChange={(e) => setNotifications({ ...notifications, sms: e.target.checked })}
              />
            }
            label="رسائل SMS"
            sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}
          />
        </Paper>
      </TabPanel>

      {/* Security Tab */}
      <TabPanel value={tabIndex} index={2}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">إعدادات الأمان</Typography>
          <TextField label="كلمة المرور الحالية" type="password" fullWidth sx={{ mt: 2 }} />
          <TextField label="كلمة المرور الجديدة" type="password" fullWidth sx={{ mt: 2 }} />
          <TextField label="تأكيد كلمة المرور" type="password" fullWidth sx={{ mt: 2 }} />
          <FormControlLabel
            control={<Switch />}
            label="المصادقة الثنائية"
            sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
          />
          <Button variant="contained" sx={{ mt: 2 }}>تحديث كلمة المرور</Button>
        </Paper>
      </TabPanel>

      {/* Appearance Tab */}
      <TabPanel value={tabIndex} index={3}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">إعدادات المظهر</Typography>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>المظهر</InputLabel>
            <Select value={theme} onChange={(e) => setTheme(e.target.value as string)}>
              <MenuItem value="light">فاتح</MenuItem>
              <MenuItem value="dark">داكن</MenuItem>
              <MenuItem value="system">تلقائي</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="body2" sx={{ mt: 2 }}>اللون الأساسي</Typography>
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            <Box sx={{ width: 32, height: 32, bgcolor: "blue", borderRadius: "50%", border: "2px solid blue", cursor: "pointer" }} />
            <Box sx={{ width: 32, height: 32, bgcolor: "green", borderRadius: "50%", cursor: "pointer" }} />
            <Box sx={{ width: 32, height: 32, bgcolor: "purple", borderRadius: "50%", cursor: "pointer" }} />
            <Box sx={{ width: 32, height: 32, bgcolor: "orange", borderRadius: "50%", cursor: "pointer" }} />
          </Box>
        </Paper>
      </TabPanel>

      {/* System Tab */}
      <TabPanel value={tabIndex} index={4}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">إعدادات النظام</Typography>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>اللغة</InputLabel>
            <Select value={language} onChange={(e) => setLanguage(e.target.value as string)}>
              <MenuItem value="ar">العربية</MenuItem>
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="he">עברית</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>المنطقة الزمنية</InputLabel>
            <Select value={timezone} onChange={(e) => setTimezone(e.target.value as string)}>
              <MenuItem value="asia/gaza">آسيا/غزة</MenuItem>
              <MenuItem value="asia/jerusalem">آسيا/القدس</MenuItem>
              <MenuItem value="asia/amman">آسيا/عمان</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>العملة</InputLabel>
            <Select value={currency} onChange={(e) => setCurrency(e.target.value as string)}>
              <MenuItem value="ils">شيكل إسرائيلي (₪)</MenuItem>
              <MenuItem value="usd">دولار أمريكي ($)</MenuItem>
              <MenuItem value="eur">يورو (€)</MenuItem>
            </Select>
          </FormControl>
        </Paper>
      </TabPanel>
    </Box>
  );
}
