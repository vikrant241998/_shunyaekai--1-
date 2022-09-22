const nodemailer = require("nodemailer");
const ejs = require("ejs");

class Email {
  constructor(option, from, to) {
    // User Details
    this.name = option.name;
    this.profile = option.profile_name;
    this.email = option.email;
    this.mobile = option.phone_no;
    this.collage = option.collage;
    this.description = option.description;

    // Product Details
    this.device = option.device;
    this.no_of_device = option.no_of_device;
    this.industry = option.industry;
    this.country = option.country;
    this.state = option.state;
    this.city = option.city;
    this.organization = option.organization;

    // Mailing Architacture

    this.from =
      from === "RIOT"
        ? `RIOT Learning <${process.env.EMAIL_RIOT}>`
        : `Shunya Ekai <${process.env.EMAIL_SHUNYAEKAI}>`;

    this.to =
      to === "RIOT" ? process.env.EMAIL_RIOT : process.env.EMAIL_SHUNYAEKAI;
  }

  RIOTTransport() {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "authorization@riotlearning.com",
        pass: "pdokxwauuftkralg",
      },
    });

    return transporter;
  }

  ShunyaEkaiTransport() {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "apps@shunyaekai.tech",
        pass: "ipufxrkpxawwptyg",
      },
    });

    return transporter;
  }

  async sendForJob(subject, from, file) {
    let html = "";

    if (this.profile === "Internship") {
      html = await ejs.renderFile(`${__dirname}/../views/internship.ejs`, {
        profile: this.profile,
        name: this.name,
        email: this.email,
        mobile: this.mobile,
        collage: this.collage,
        description: this.description,
      });
    } else {
      html = await ejs.renderFile(`${__dirname}/../views/jobProfile.ejs`, {
        profile: this.profile,
        name: this.name,
        email: this.email,
        mobile: this.mobile,
      });
    }

    const mailOptions = {
      from: `${from} <${from}>`,
      to: this.to,
      subject,
      html,
      attachments: [
        {
          fileName: file.filename,
          path: file.path,
        },
      ],
    };

    // Send Mail
    return await this.ShunyaEkaiTransport().sendMail(mailOptions);
  }

  async Enroll(subject, data) {
    let enroll_time = `${data.enroll_time}`.split(" ");

    const html = await ejs.renderFile(`${__dirname}/../views/enrolled.ejs`, {
      date: enroll_time.slice(0, enroll_time.length / 2 - 1).join(" "),
      time: enroll_time
        .slice(enroll_time.length / 2 - 1, enroll_time.length)
        .join(" "),
    });

    const mailOptions = {
      from: this.from,
      to: data.email,
      subject,
      html,
    };

    return await this.RIOTTransport().sendMail(mailOptions);
  }

  async Thankyou(subject, name, email) {
    const html = await ejs.renderFile(`${__dirname}/../views/form.ejs`, {
      name,
    });

    const mailOptions = {
      from: this.from,
      to: email,
      subject,
      html,
    };

    return await this.RIOTTransport().sendMail(mailOptions);
  }

  async forProduct(subject) {}

  async OTPGen(subject, otp, mail) {
    const html = await ejs.renderFile(`${__dirname}/../views/OTP.ejs`, {
      otp,
    });

    const mailOptions = {
      from: this.from,
      to: mail,
      subject,
      html,
    };

    return await this.RIOTTransport().sendMail(mailOptions);
  }

  async toSendAdmin(subject, from, data) {
    const Data = JSON.stringify(data);

    const html = Data.replace(/,/g, `<br/>`);

    const mailOptions = {
      from: `${from} <${from}@gmail.com>`,
      to: this.to,
      subject,
      html,
    };

    if (this.to === "connect@riotlearning.com") {
      return await this.RIOTTransport().sendMail(mailOptions);
    }

    return await this.ShunyaEkaiTransport().sendMail(mailOptions);
  }
}

module.exports = Email;
