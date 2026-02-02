import { Drawer, Form, Input, Select, Button, App, InputNumber } from "antd";
import type { DrawerProps } from "antd";
import {
  useCreateDealer,
  type ICreateDealerRequest,
  type DealerTier,
} from "@/services/dealer";
import { type FC } from "react";

interface CreateDealerProps {
  open: boolean;
  onClose: () => void;
  placement?: DrawerProps["placement"];
}

const CreateDealer: FC<CreateDealerProps> = ({
  open,
  onClose,
  placement = "right",
}) => {
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const createDealerMutation = useCreateDealer({
    onSuccess: () => {
      message.success("Dealer created successfully!");
      form.resetFields();
      onClose();
    },
  });

  const handleSubmit = (values: {
    firstName: string;
    lastName?: string;
    email: string;
    accountNumber: number;
    companyName: string;
    genuinePartsTier: DealerTier;
    aftermarketESTier: DealerTier;
    aftermarketBTier: DealerTier;
    notes?: string;
  }) => {
    const payload: ICreateDealerRequest = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      accountNumber: values.accountNumber,
      companyName: values.companyName,
      genuinePartsTier: values.genuinePartsTier,
      aftermarketESTier: values.aftermarketESTier,
      aftermarketBTier: values.aftermarketBTier,
      notes: values.notes,
    };

    createDealerMutation.mutate(payload);
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  const tierOptions: Array<{ label: string; value: DealerTier }> = [
    { label: "Net 1", value: "Net1" },
    { label: "Net 2", value: "Net2" },
    { label: "Net 3", value: "Net3" },
    { label: "Net 4", value: "Net4" },
    { label: "Net 5", value: "Net5" },
    { label: "Net 6", value: "Net6" },
    { label: "Net 7", value: "Net7" },
  ];

  return (
    <Drawer
      title="Add New Dealer"
      width={600}
      placement={placement}
      onClose={handleCancel}
      open={open}
      closable={true}
      className="bg-[#FAFAFA] createdealers"
    >
      <div className="w-full h-full flex flex-col justify-between">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="mt-4"
        >
          <div className="flex gap-4">
            <Form.Item
              label="First Name"
              name="firstName"
              className="mb-3 w-1/2"
              rules={[
                { required: true, message: "Please enter first name" },
              ]}
            >
              <Input size="large" placeholder="Enter first name" />
            </Form.Item>

            <Form.Item label="Last Name" name="lastName" className="mb-3 w-1/2">
              <Input size="large" placeholder="Enter last name" />
            </Form.Item>
          </div>

          <Form.Item
            label="Company Name"
            name="companyName"
            className="mb-3"
            rules={[
              { required: true, message: "Please enter company name" },
            ]}
          >
            <Input size="large" placeholder="Enter company name" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Account Number"
              name="accountNumber"
              rules={[
                { required: true, message: "Please enter account number" },
              ]}
            >
              <InputNumber
                size="large"
                type="number"
                placeholder="Enter account number"
                className="w-full!"
              />
            </Form.Item>

            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                { required: true, message: "Please enter email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input size="large" placeholder="Enter Email" />
            </Form.Item>
          </div>

          <Form.Item
            label="Genuine Parts Tier"
            name="genuinePartsTier"
            rules={[
              { required: true, message: "Please select genuine parts tier" },
            ]}
          >
            <Select
              size="large"
              placeholder="Select tier"
              options={tierOptions}
            />
          </Form.Item>

          <Form.Item
            label="Aftermarket ES Tier"
            name="aftermarketESTier"
            rules={[
              { required: true, message: "Please select aftermarket ES tier" },
            ]}
          >
            <Select
              size="large"
              placeholder="Select tier"
              options={tierOptions}
            />
          </Form.Item>

          <Form.Item
            label="Aftermarket B Tier"
            name="aftermarketBTier"
            rules={[
              { required: true, message: "Please select aftermarket B tier" },
            ]}
          >
            <Select
              size="large"
              placeholder="Select tier"
              options={tierOptions}
            />
          </Form.Item>

          <Form.Item label="Notes" name="notes">
            <Input.TextArea
              size="large"
              placeholder="Enter notes (optional)"
              rows={3}
            />
          </Form.Item>
        </Form>
        <div className="flex justify-between gap-3 mt-6 w-full">
          <Button
            onClick={handleCancel}
            className="w-1/2 rounded-[38px]! h-[42px]!"
            disabled={createDealerMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            className="w-1/2 rounded-[38px]! h-[42px]!"
            onClick={() => form.submit()}
            loading={createDealerMutation.isPending}
          >
            Submit & Create
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export { CreateDealer };
