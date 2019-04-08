import { Component } from '@angular/core';

import { InvitationProviderService } from '../providers/invitation-provider.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  
  constructor(
    private ivtService : InvitationProviderService,
  ) {
  }

}
