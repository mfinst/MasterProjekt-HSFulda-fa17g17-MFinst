// {msg: this.msg, receiver: this.receiver, topic: this.topic, imgUrls: this.imgUrls}
import { isUndefined } from 'ionic-angular/util/util';

export class MessageModel {
  senderId: string;
  senderNick: string;
  receiverNick: string;
  subjectType: string;
  msg: string;
  topic: string;
  imgUrls: string[];
  local: boolean;
  formattedDate: string;
  formattedTime: string;
  constructor() {}

  toJson() {
    let hasFiles = false;
    if( !isUndefined(this.imgUrls)) hasFiles = true;
    return     {
      "SenderID"		: this.senderId,
      "SenderNick"	: this.senderNick,
      "ReceiverNick": this.receiverNick,
      "Subject"		  : this.subjectType,
      "Topic"			  : this.topic,
      "Message"		  : this.msg,
      "Date"			  : this.formattedDate,
      "Time"			  : this.formattedTime,
      "HasFiles"	  : hasFiles,
      "IsLocal"		  : this.local,
      "Attachments"	: this.imgUrls
    }
  }
}
