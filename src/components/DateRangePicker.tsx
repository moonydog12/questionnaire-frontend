import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

type DateRangePickerProps = {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  handleStartDateChange: (date: Dayjs | null) => void;
  handleEndDateChange: (date: Dayjs | null) => void;
};

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  handleStartDateChange,
  handleEndDateChange,
}) => {
  const today = dayjs().startOf('day');
  const maxDate = startDate ? startDate.add(30, 'day') : undefined;

  return (
    <div>
      {/* Start Date Picker */}
      <DatePicker
        label="Start Date"
        value={startDate}
        onChange={handleStartDateChange}
        minDate={today}
        disablePast
      />

      {/* End Date Picker */}
      <DatePicker
        label="End Date"
        value={endDate}
        onChange={handleEndDateChange}
        minDate={startDate || today}
        maxDate={maxDate}
        disablePast
      />
    </div>
  );
};

export default DateRangePicker;
