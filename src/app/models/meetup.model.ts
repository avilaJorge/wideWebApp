export class Meetup {
  public organizer_photo: string;
  public organizer_name: string;
  public name: string;
  public city: string;
  public key_photo: string;
  public description: string;
  constructor(fields: any) {
    this.organizer_photo = fields.organizer.photo ? fields.organizer.photo.thumb_link : 'assets/imgs/no_user1.png';
    this.name = fields.name;
    this.city = fields.city;
    this.organizer_name = fields.organizer.name;
    this.key_photo = fields.key_photo ? fields.key_photo.photo_link :
      fields.group_photo ? fields.group_photo.photo_link : '';
    this.description = fields.description;
  }
}
