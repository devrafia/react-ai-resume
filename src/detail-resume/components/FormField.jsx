import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";

export default function FormField({
  label,
  id,
  type = "text",
  value,
  onChange,
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-bold text-xs" htmlFor={id}>
        {label}
      </label>
      {type === "textarea" ? (
        <Textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          className="w-full border p-2 rounded"
        />
      ) : (
        <Input
          id={id}
          name={id}
          type={type || "text"}
          value={value}
          onChange={onChange}
          className="w-full border p-2 rounded"
        />
      )}
    </div>
  );
}
